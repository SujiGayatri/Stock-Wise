app.post("/suggest", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  const systemPrompt = `
You are a fashion stylist.
Given the user prompt and outfit data below, return a JSON array of matching outfit IDs only.

User Prompt: "${prompt}"

Outfits:
${JSON.stringify(outfits)}

Respond ONLY with a JSON array like: [1, 3, 7]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }],
      temperature: 0.3,
    });

    const ids = JSON.parse(completion.choices[0].message.content);
    res.json({ ids });
  } catch (error) {
    console.error("OpenAI Suggest Error:", error);
    res.status(500).json({ error: "Failed to suggest outfits" });
  }
});
