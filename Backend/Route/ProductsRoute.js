const schemaFieldMap = {
    "name": "Name",
    "type": "Type",
    "color": "Color",
    "style": "Style",
    "occasion": "Occasion",
    "fabric": "Fabric",
    "size": "Size",
    "fit": "Fit",
    "price": "Price",
    "season": "Season",
    "category": "Category",
    "id": "ID"
};

app.post('/api/products/filter', async (req, res) => {
    const userQuery = req.body.query;

    if (!userQuery) {
        return res.status(400).json({ message: "Query parameter is required." });
    }

    try {
        const prompt = `
            Extract clothing product filter criteria from the following user query.
            Output a JSON object where keys are MongoDB/Mongoose schema fields and values are the extracted criteria.
            The available schema fields are: ID, Name, Type, Color, Style, Occasion, Fabric, Size, Fit, Price, Season, Category.
            For 'Price', use a range like {"$gte": min, "$lte": max} if a range is implied, or a single number if exact.
            If a filter is not explicitly mentioned or clearly implied, omit it.
            Example:
            User Query: "Show me red dresses for a party, size M under $50"
            Output: { "Color": "Red", "Type": "Dress", "Occasion": "Party", "Size": "M", "Price": { "$lte": 50 } }

            User Query: "${userQuery}"
            Output:
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        let filters = {};
        try {
            const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch && jsonMatch[1]) {
                filters = JSON.parse(jsonMatch[1]);
            } else {
                filters = JSON.parse(text); 
            }
        } catch (parseError) {
            console.error("Error parsing Gemini's JSON output:", parseError);
            console.error("Gemini output:", text);
            return res.status(500).json({ message: "Could not parse filter criteria from AI response.", debug: text });
        }

        const mongooseQuery = {};
        for (const key in filters) {
            const mappedKey = schemaFieldMap[key.toLowerCase()] || key;
            if (Product.schema.paths[mappedKey]) { 
                if (typeof filters[key] === 'string' && mappedKey !== 'ID') { 
                    mongooseQuery[mappedKey] = { $regex: new RegExp(filters[key], 'i') }; 
                } else if (mappedKey === 'Price' && typeof filters[key] === 'object' && (filters[key].$gte || filters[key].$lte)) {
                    mongooseQuery[mappedKey] = filters[key]; 
                } else {
                    mongooseQuery[mappedKey] = filters[key];
                }
            } else {
                console.warn(`Filter key "${key}" (mapped to "${mappedKey}") not found in schema.`);
            }
        }

        console.log("Constructed Mongoose Query:", mongooseQuery);

        const products = await Product.find(mongooseQuery);
        res.json(products);

    } catch (error) {
        console.error("Error filtering products:", error);
        res.status(500).json({ message: "Failed to filter products." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));