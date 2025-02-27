import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";

const books = [
  { title: "Biotech", course: "MATH 151", price: 30, condition: "FAIR", image: "/biotech.jpg" },
  { title: "Calculus", course: "PHIL 115", price: 25, condition: "POOR", image: "/calculus.jpg" },
  { title: "Philosophy", course: "CISC 271", price: 40, condition: "GOOD", image: "/philosophy.jpg" },
  { title: "PHIL 157", course: "PHIL 157", price: 35, condition: "GOOD", image: "" },
  { title: "MATH 111", course: "MATH 111", price: 30, condition: "FAIR", image: "" },
  { title: "CISC 223", course: "CISC 223", price: 30, condition: "FAIR", image: "" },
];

const Marketplace = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        {/* Adjust grid to 4 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {books.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
