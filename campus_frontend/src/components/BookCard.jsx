const BookCard = ({ title, course, price, condition, image }) => {
  // Condition color mapping
  const conditionColors = {
    GOOD: "bg-green-100 text-green-800",
    FAIR: "bg-yellow-100 text-yellow-800",
    POOR: "bg-red-100 text-red-800",
  };

  // Placeholder image
  const placeholderImage = "/placeholder.png"; // Make sure you have this in /public

  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-lg hover:border-black transition-all duration-200 bg-white">
      {/* Image Section */}
      <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        <img
          src={image || placeholderImage}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Course Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{course}</h3>

      {/* Price */}
      <p className="text-2xl font-bold text-emerald-600 mb-2">${price}</p>

      {/* Condition Badge */}
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${conditionColors[condition]}`}>
        {condition}
      </span>
    </div>
  );
};

export default BookCard;
