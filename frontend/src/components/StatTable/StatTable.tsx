// import { useState, useEffect } from "react";
// import styles from "./StatTable.module.css";

// const StatTable = ({ team, startingFive, substitutes, updateStats }) => {
//   const [tempPlayers, setTempPlayers] = useState(startingFive);
//   const [substitutesList, setSubstitutesList] = useState(substitutes);
//   const [playersHistory, setPlayersHistory] = useState([]);
//   const [substitutesHistory, setSubstitutesHistory] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [fouledOutPlayer, setFouledOutPlayer] = useState(null);

//   useEffect(() => {
//     setTempPlayers(startingFive);
//   }, [startingFive]);

//   useEffect(() => {
//     setSubstitutesList(substitutes);
//   }, [substitutes]);

//   const calculateTotalScore = (players) => {
//     return players.reduce((total, player) => {
//       return (
//         total +
//         (player.stats["1Pts"] || 0) +
//         2 * (player.stats["2Pts"] || 0) +
//         3 * (player.stats["3Pts"] || 0)
//       );
//     }, 0);
//   };

//   const updateStat = (playerId, statType) => {
//     setPlayersHistory((prev) => [...prev, tempPlayers]);
//     const updatedPlayers = tempPlayers.map((player) => {
//       if (player.id === playerId) {
//         const newStats = {
//           ...player.stats,
//           [statType]: (player.stats[statType] || 0) + 1,
//         };
//         if (newStats.fouls === 5) {
//           setShowPopup(true);
//           setFouledOutPlayer(player.id);
//         }
//         return {
//           ...player,
//           stats: newStats,
//         };
//       }
//       return player;
//     });
//     setTempPlayers(updatedPlayers);
//     updateStats(updatedPlayers);
//   };

//   const switchPlayer = (selectedPlayerId, playerIdToSwitch) => {
//     if (fouledOutPlayer === playerIdToSwitch) {
//       setShowPopup(false);
//       setFouledOutPlayer(null);
//     }
//     setPlayersHistory((prev) => [...prev, tempPlayers]);
//     setSubstitutesHistory((prev) => [...prev, substitutesList]);
//     const updatedPlayers = tempPlayers.map((player) => {
//       if (player.id === playerIdToSwitch) {
//         const switchedPlayer = substitutesList.find(
//           (substitute) => substitute.id === selectedPlayerId
//         );
//         setSubstitutesList((prevSubstitutes) =>
//           prevSubstitutes.filter((sub) => sub.id !== selectedPlayerId)
//         ); // Remove switched player from substitutes
//         setSubstitutesList((prevSubstitutes) => [...prevSubstitutes, player]); // Add the substituted player back to substitutes
//         return switchedPlayer;
//       }
//       return player;
//     });
//     setTempPlayers(updatedPlayers);
//     updateStats(updatedPlayers);
//   };

//   const undo = () => {
//     if (playersHistory.length > 0) {
//       const previousPlayersState = playersHistory.pop();
//       setTempPlayers(previousPlayersState);
//       setPlayersHistory(playersHistory);
//       updateStats(previousPlayersState);
//     }
//     if (substitutesHistory.length > 0) {
//       const previousSubstitutesState = substitutesHistory.pop();
//       setSubstitutesList(previousSubstitutesState);
//       setSubstitutesHistory(substitutesHistory);
//     }
//     setShowPopup(false);
//     setFouledOutPlayer(null);
//   };
import { useState, useEffect } from "react";
import styles from "./StatTable.module.css";

interface Player {
  _id: string;
  id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  age: number;
  affiliation: string;
  phoneNumber: number;
  playerPhotoURL: string;
  stats: {
    [key: string]: number;
  };
}

interface StatTableProps {
  team: string;
  startingFive: Player[];
  substitutes: Player[];
  updateStats: (players: Player[]) => void;
}

const StatTable = ({ team, startingFive, substitutes, updateStats }: StatTableProps) => {
  const [tempPlayers, setTempPlayers] = useState<Player[]>(startingFive);
  const [substitutesList, setSubstitutesList] = useState<Player[]>(substitutes);
  const [playersHistory, setPlayersHistory] = useState<Player[][]>([]);
  const [substitutesHistory, setSubstitutesHistory] = useState<Player[][]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [fouledOutPlayer, setFouledOutPlayer] = useState<string | null>(null);

  useEffect(() => {
    setTempPlayers(startingFive);
  }, [startingFive]);

  useEffect(() => {
    setSubstitutesList(substitutes);
  }, [substitutes]);

  const calculateTotalScore = (players: Player[]): number => {
    return players.reduce((total, player) => {
      return (
        total +
        (player.stats["1Pts"] || 0) +
        2 * (player.stats["2Pts"] || 0) +
        3 * (player.stats["3Pts"] || 0)
      );
    }, 0);
  };

  const updateStat = (playerId: string, statType: string) => {
    setPlayersHistory((prev) => [...prev, tempPlayers]);
    const updatedPlayers = tempPlayers.map((player) => {
      if (player.id === playerId) {
        const newStats = {
          ...player.stats,
          [statType]: (player.stats[statType] || 0) + 1,
        };
        if (newStats.fouls === 5) {
          setShowPopup(true);
          setFouledOutPlayer(player.id);
        }
        return {
          ...player,
          stats: newStats,
        };
      }
      return player;
    });
    setTempPlayers(updatedPlayers);
    updateStats(updatedPlayers);
  };

  const switchPlayer = (selectedPlayerId: string, playerIdToSwitch: string) => {
    if (fouledOutPlayer === playerIdToSwitch) {
      setShowPopup(false);
      setFouledOutPlayer(null);
    }
    setPlayersHistory((prev) => [...prev, tempPlayers]);
    setSubstitutesHistory((prev) => [...prev, substitutesList]);
    const updatedPlayers = tempPlayers.map((player) => {
      if (player.id === playerIdToSwitch) {
        const switchedPlayer = substitutesList.find(
          (substitute) => substitute.id === selectedPlayerId
        );
        setSubstitutesList((prevSubstitutes) =>
          prevSubstitutes.filter((sub) => sub.id !== selectedPlayerId)
        );
        setSubstitutesList((prevSubstitutes) => [...prevSubstitutes, player]);
        return switchedPlayer!;
      }
      return player;
    });
    setTempPlayers(updatedPlayers);
    updateStats(updatedPlayers);
  };

  const undo = () => {
    if (playersHistory.length > 0) {
      const previousPlayersState = playersHistory.pop()!;
      setTempPlayers(previousPlayersState);
      setPlayersHistory(playersHistory);
      updateStats(previousPlayersState);
    }
    if (substitutesHistory.length > 0) {
      const previousSubstitutesState = substitutesHistory.pop()!;
      setSubstitutesList(previousSubstitutesState);
      setSubstitutesHistory(substitutesHistory);
    }
    setShowPopup(false);
    setFouledOutPlayer(null);
  };

  return (
    <div className={styles.statTable}>
      <h2>{team}</h2>
      {showPopup && (
        <div className={styles.popup}>
          <p>
            Player with 5 fouls detected. Please substitute this player out.
          </p>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Total Score</th>
            <th>Name</th>
            <th>#</th>
            <th>Fouls</th>
            <th>1-Pt</th>
            <th>2-Pts</th>
            <th>3-Pts</th>
            <th>Assists</th>
            <th>Rebs</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Pts/Assts/Rebs/Stls/Blks/Fls</th>
          </tr>
        </thead>
        <tbody>
          {tempPlayers.map((player, index) => (
            <tr
              key={player.id}
              className={player.stats.fouls === 5 ? styles.fouledOut : ""}
            >
              {index === 0 && (
                <td rowSpan={tempPlayers.length} className={styles.totalScore}>
                  <b>{calculateTotalScore(tempPlayers)}</b>
                </td>
              )}
              <td>
                {player.name}
                {substitutesList.length > 0 && (
                  <select
                    onChange={(e) => switchPlayer(e.target.value, player.id)}
                  >
                    <option value=""> </option>
                    {substitutesList.map((substitute) => (
                      <option
                        key={substitute.id}
                        value={substitute.id}
                        disabled={substitute.stats?.fouls === 5}
                      >
                        {substitute.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td>{player.jerseyNumber}</td>
              <td>
                <button
                  onClick={() => updateStat(player.id, "fouls")}
                  className={styles.statButton}
                  disabled={player.stats.fouls === 5}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => updateStat(player.id, "1Pts")}
                  className={styles.statButton}
                  disabled={player.stats.fouls === 5}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => updateStat(player.id, "2Pts")}
                  className={styles.statButton}
                  disabled={player.stats.fouls === 5}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => updateStat(player.id, "3Pts")}
                  className={styles.statButton}
                  disabled={player.stats.fouls === 5}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => updateStat(player.id, "assists")}
                  className={styles.statButton}
                  disabled={player.stats.fouls === 5}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => updateStat(player.id, "rebounds")}
                  className={styles.statButton}
                  disabled={player.stats.fouls === 5}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => updateStat(player.id, "steals")}
                  className={styles.statButton}
                  disabled={player.stats.fouls === 5}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => updateStat(player.id, "blocks")}
                  className={styles.statButton}
                  disabled={player.stats.fouls === 5}
                >
                  +
                </button>
              </td>
              <td>{`Pts: ${
                player.stats["1Pts"] +
                2 * player.stats["2Pts"] +
                3 * player.stats["3Pts"]
              }, Assts: ${player.stats.assists}, Rebs: ${
                player.stats.rebounds
              }, Stls: ${player.stats.steals}, Blks: ${
                player.stats.blocks
              }, Fls: ${player.stats.fouls}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={undo} className={styles.undoButton}>
        Undo
      </button>
    </div>
  );
};

export default StatTable;
