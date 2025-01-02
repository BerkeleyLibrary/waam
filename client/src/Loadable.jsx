import { Suspense } from "react";

const Loadable = (Component) =>
  function loadable(props) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;