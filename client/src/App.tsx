import { useEffect } from "react";


//default redirect to dashboard
function App() {
  useEffect(() => {
    window.location.href = "/dashboard";
  });

  return <></>;
}

export default App;
