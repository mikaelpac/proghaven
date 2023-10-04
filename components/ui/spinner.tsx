import { CSSProperties } from "react";
import ScaleLoader from "react-spinners/Scaleloader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <div className="spinner-container">
      <ScaleLoader cssOverride={override} color={"red"} loading={loading} />
    </div>
  );
};

export default Spinner;
