import React, { useState } from "react";

import "./Favorites.css";

import { useSelector, useDispatch } from "react-redux";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

import { DELETE } from "../constants/Types";

const Favorites = ({ styles }) => {
  const [toggle, setToggle] = useState(false);

  const favorites = useSelector(state => state.favorites);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // Deleting Characters

  const dispatch = useDispatch();

  const handleDelete = (favorite, i) => {
    dispatch({ type: DELETE, payload: favorite, i });
  };


    return (
      //   Favorites
      <>
        <div className={"container"}>
          {toggle ? (
            <h2
              className={styles ? "container-title_black" : "container-title"}
              onClick={handleToggle}
            >
              Favorites{" "}
              <span>
                {" "}
                <IoMdArrowDropup />{" "}
              </span>
            </h2>
          ) : (
            <h2
              className={styles ? "container-title_black" : "container-title"}
              onClick={handleToggle}
            >
              Favorites{" "}
              <span>
                {" "}
                <IoMdArrowDropdown />{" "}
              </span>
            </h2>
          )}
        </div>
        <div className={toggle ? "Favorites-toggle" : "Favorites"}>
          {favorites.map((favorite, i) => {
            const {
              id,
              name,
              status,
              species,
              gender,
              origin,
              image
            } = favorite;
            return (
              <div className="Cards-container_character" key={id}>
                <div
                  className="Character-img"
                  style={{
                    background: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    maxWidth: "100%",
                    height: "auto"
                  }}
                ></div>
                <div
                  className={styles ? "Character-inf_black" : "Character-inf"}
                >
                  <h2 className="Character-inf_title">{name}</h2>
                  {status === "Alive" ? (
                    <p className="Character-inf_text">
                      {" "}
                      <FaCircle className="Status-alive" /> {status} - {species}{" "}
                    </p>
                  ) : (
                    <p className="Character-inf_text">
                      {" "}
                      <FaCircle className="Status-dead" /> {status} - {species}{" "}
                    </p>
                  )}

                  <p className="Character-inf_text2">{gender}</p>
                  <h2 className="Character-inf_title">Origin</h2>
                  <p className="Character-inf_text2">{origin.name}</p>
                  <p
                    className="Character-inf_text3"
                    onClick={() => handleDelete(favorite, i)}
                  >
                    <TiDeleteOutline /> Delete
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

export default Favorites;
