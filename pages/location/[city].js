import LocationSearchBar from "../../components/LocationSearchBar";
import Link from "next/link";
import data from "../../lib/city.list.json";

export async function getServerSideProps(context) {
  // const res = await fetch("https://api.example.com/data/context.params.id");
  // const data = await res.json();
  console.log(context.params.city);
  return {
    props: {
      city: "",
    },
  };
}

export default function City() {
  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <p className="w-50">
            <Link href={"/"} className="text-decoration-none text-white">
              &larr; Home
            </Link>
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <LocationSearchBar className="text-center" />
        </div>
      </div>
    </>
  );
}
