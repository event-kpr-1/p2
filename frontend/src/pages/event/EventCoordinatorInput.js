import React from "react";
import { GrFormAdd, GrFormClose } from "react-icons/gr";

const EventCoordinatorInput = ({inputs,setInputs}) => {
  // const [inputs, setInputs] = useState([]);

  const handleAddInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      { name: "", email: "", phone: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input, i) =>
        i === index ? { ...input, [field]: value } : input
      )
    );
  };

  const handleRemoveInput = (index) => {
    setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
  };

  

  return (
    <div className="flex items-center justify-center rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none ">
      <div className="w-full max-w-2xl p-4 px-8 bg-white rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add Coordinators
        </h2>
        <div>
          {inputs.map((input, index) => (
            <div
              key={index}
              className="p-4 mb-4 border-2 border-yellow-400 rounded-lg"
            >
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={input.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  placeholder="Enter name"
                  className="input input-bordered w-full text-lg p-3 rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={input.email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                  placeholder="Enter email"
                  className="input input-bordered w-full text-lg p-3 rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={input.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(index, "phone", e.target.value)
                  }
                  placeholder="Enter phone number"
                  className="input input-bordered w-full text-lg p-3 rounded-lg border-2 border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveInput(index)}
                  className="btn btn-error btn-sm text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <GrFormClose className="text-lg" /> Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={handleAddInput}
              className="btn btn-primary w-full py-3 text-white font-semibold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 rounded-lg transition duration-300 ease-in-out focus:ring-4 focus:ring-amber-500 focus:outline-none"
            >
              <GrFormAdd className="text-lg" /> Add Coordinator
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default EventCoordinatorInput;
