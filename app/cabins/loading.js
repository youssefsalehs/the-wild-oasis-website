import Spinner from "@/app/_components/Spinner";

function loading() {
  return <div className="grid items-center justify-center">
    <Spinner/>
    <p className="text-xl text-center"> Loading cabin data....</p>
  </div>;
}

export default loading;
