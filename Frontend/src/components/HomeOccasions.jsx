import { useNavigate,Link } from "react-router-dom";
import Loader from "../pages/Loader";
import { useState } from "react";
const HomeOccasions = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(false);
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

  const seasonalList = [
    "Summer",
    "Winter",
    "Rainy",
    "Festive",
  ];

  const handleOccasionClick = async (occasion, category) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/occasion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occasion, category }),
      });
      const data = await res.json();
      navigate("/Products", { state: { suggestions: data, title: occasion } });
    } catch (error) {
      console.error("Error fetching occasion products:", error);
      setIsLoading(false);
    }
  };

  const handleSeasonClick = async (season) => {
    console.log(season);
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/season", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ season }),
      });

      const data = await res.json();
      console.log(data);
      navigate("/Products", { state: { suggestions: data, title: season } });
    } catch (error) {
      console.error("Error fetching seasonal products:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading &&(
      <div style={{ 
        // display: 'flex', justifyContent: 'center', alignItems: 'center', height:'400px'
        position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
        }}>
        <Loader />
      </div>
    )}
    {!isLoading &&(
    <div className="HomeOccasions">
      <div className="HomeFont2">OCCATIONS</div>
      <div className="OccasionMain">
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
