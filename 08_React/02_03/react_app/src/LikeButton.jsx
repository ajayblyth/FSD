import { useState } from "react";

function LikeButton() {

    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <>

            <i
                className={
                    liked
                    ? "fa-solid fa-heart"
                    : "fa-regular fa-heart"
                }
            ></i>

            <button onClick={toggleLike}>
                Like Me
            </button>

        </>
    );

}

export default LikeButton;