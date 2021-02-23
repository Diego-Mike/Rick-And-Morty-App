import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from "react";

import "./Cards.css";

import loading from "../Images/loading.png";
import { FaCircle } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import SearchBar from "../components/Search";
import Favorites from "../components/Favorites";

import { useDispatch } from "react-redux";
import { FAVORITES } from "../constants/Types";

const Cards = ({ styles }) => {
  // Variables

  const [Data, setData] = useState([]);
  const [singleCharacter, setSingleCharacter] = useState({});
  const [number, setNumber] = useState(1);
  const [Loading, setLoading] = useState(true);

  const searchInput = useRef(null);
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState();

  const dispatch = useDispatch();

  // Search Bar

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteredCharacters = useMemo(
    () =>
      Data.filter(user => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [Data, search]
  );

  // Fetching rick and morty's api

  const url = `https://rickandmortyapi.com/api/character/?page=${number}`;

  const handleData = () => {
    setNumber(number + 1);
    setSingleCharacter({});
    setLoading(!Loading);
  };

  const fetching = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setLoading(!Loading);
      setData(Data.concat(data.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetching();
  }, [number]);

  // Passing The Fucking Data Homie

  const passingData = (character, id) => {
    setSingleCharacter(character);

    setModal(true);
  };

  // Showing or Not Showing Modal

  const Modal = () => {
    dispatch({ type: FAVORITES, payload: singleCharacter });

    setModal(false);
  };

  const NoModal = () => {
    setModal(false);
    setSingleCharacter({});
  };

  if (Loading) {
    return (
      <div className={styles ? "Loading-black" : "Loading"}>
        <img src={loading} alt="" />
      </div>
    );
  } else {
    return (
      <>
        {/* Modal Window */}

        <div className={modal ? "Modal" : "No-Modal"}>
          <div className={modal ? "Modal-container" : "No-Modal-container"}>
            <h2>
              Do You Want To Add <br /> {singleCharacter.name} To Favorites ?
            </h2>
            <div>
              <span onClick={Modal}>Yes</span>
              <span onClick={NoModal}>Nop</span>
            </div>
          </div>
        </div>

        <div className={styles ? "Cards-container_black" : "Cards-container"}>
          {/* Favorites */}
          <Favorites styles={styles} />
          {/*  */}

          {/* Search Bar */}

          <SearchBar
            styles={styles}
            search={search}
            searchInput={searchInput}
            handleSearch={handleSearch}
          />

          {filteredCharacters.map(character => {
            const {
              id,
              name,
              status,
              species,
              gender,
              origin,
              image
            } = character;
            return (
              <div className="Cards-container_character" key={id}>
                <div
                  className="Character-img"
                  style={{
                    background: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
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
                    onClick={() => passingData(character)}
                    className="Character-inf_text3"
                  >
                    <BiMessageSquareAdd /> Add To Fav
                  </p>
                </div>
              </div>
            );
          })}
          <div className="More">
            <button onClick={handleData} className="More-button">
              More Data
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default Cards;
