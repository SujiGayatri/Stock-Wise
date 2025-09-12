import { useNavigate, Link } from "react-router-dom";
import Loader from "../pages/Loader";
import { useState } from "react";
import BASE_URL from "../Utils/config";

const HomeOccasions = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const womenList = [
    "Party Wear",
    "Casual Wear",
    "Traditional Wear",
    "Formal Wear",
    "Sleep Wear",
    "Ethnic Wear",
    "Festive Wear",
  ];

  const menList = [
    "Formal Wear",
    "Casual Wear",
    "Ethnic Wear",
    "Party Wear",
    "Festive Wear",
    "Street Wear",
  ];

  const kidsList = [
    "Birthday Wear",
    "Casual Wear",
    "Festive Wear",
    "Traditional Wear",
    "Sleep Wear",
  ];

  const seasonalList = ["Summer", "Winter", "Rainy", "Festive"];

  const handleOccasionClick = async (occasion, category) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/api/occasion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occasion, category }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch occasion products");
      }

      const data = await res.json();
      navigate("/Products", { state: { suggestions: data, title: occasion } });
    } catch (error) {
      console.error("Error fetching occasion products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeasonClick = async (season) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/api/season`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ season }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch seasonal products");
      }

      const data = await res.json();
      navigate("/Products", { state: { suggestions: data, title: season } });
    } catch (error) {
      console.error("Error fetching seasonal products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}

      {!isLoading && (
        <div className="HomeOccasions">
          <div className="HomeFont2">OCCASIONS</div>
          <div className="OccasionMain">
            {/* Women's Section */}
            <div className="OccasionWomen">
              <div className="OccassionsContent">
                <div className="OccassionsMain">
                  <h2 className="OccassionFont1">For Women's</h2>
                  <div className="OccassionsNames">
                    {womenList.map((item, idx) => (
                      <Link
                        key={idx}
                        className="OccassionNameFont"
                        onClick={() => handleOccasionClick(item, "Women")}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Kids and Season Specials */}
            <div className="OccasionOther">
              <div className="OccasionKid">
                <div className="OccassionsContent">
                  <div className="OccassionsMain">
                    <h2 className="OccassionFont1">For Kid's</h2>
                    <div className="OccassionsNames">
                      {kidsList.map((item, idx) => (
                        <Link
                          key={idx}
                          className="OccassionNameFont"
                          onClick={() => handleOccasionClick(item, "Kids")}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="OccasionSeason">
                <div className="OccassionsContent">
                  <div className="OccassionsMain">
                    <h2 className="OccassionFont1">Season Specials</h2>
                    <div className="OccassionsNames">
                      {seasonalList.map((item, idx) => (
                        <Link
                          key={idx}
                          className="OccassionNameFont"
                          onClick={() => handleSeasonClick(item)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Men's Section */}
            <div className="OccasionMen">
              <div className="OccassionsContent">
                <div className="OccassionsWomenMain">
                  <h2 className="OccassionFont1">For Men's</h2>
                  <div className="OccassionsNames">
                    {menList.map((item, idx) => (
                      <Link
                        key={idx}
                        className="OccassionNameFont"
                        onClick={() => handleOccasionClick(item, "Men")}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeOccasions;
