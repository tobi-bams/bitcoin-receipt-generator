import Nav from "./component/nav";
import Search from "./component/search";
function App() {
  return (
    <div
      className="py-10 px-28 h-screen md:px-3"
      style={{ backgroundColor: "#CEE5E7" }}
    >
      <Nav />
      <Search />
    </div>
  );
}

export default App;
