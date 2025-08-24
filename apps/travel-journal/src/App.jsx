import TravelCard from "./components/TravelCard"
import Header from "./components/Header"
import data from "./data"

export default function App() {
  const renderTravelEntry = data.map(entry => (
    <TravelCard
      key={entry.id}
      entryData={entry}
    />
  ))
  return (
    <>
      <Header />
      <main className="main-container">
        {renderTravelEntry}
      </main>
    </>
  )
}
