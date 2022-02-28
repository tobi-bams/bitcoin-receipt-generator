import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Search = () => {
  const [txid, setTxId] = useState("");
  async function getReceipt() {
    if (txid) {
      try {
        const response = await axios.get(
          `https://quiet-meadow-38248.herokuapp.com/getReceipt?txid=${txid}`,
          {
            responseType: "blob",
          }
        );
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        Swal.fire({
          icon: "success",
          title: `Receipt Generated Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, "_blank");
        }, 1000);
      } catch (error) {
        const reader = new FileReader();
        reader.onload = (e) => {
          Swal.fire({
            icon: "error",
            title: JSON.parse(e.target.result).message,
            showConfirmButton: false,
            timer: 2500,
          });
        };
        reader.readAsText(error.response.data);
      }
    }
  }
  return (
    <div className="bg-white rounded-lg py-2 px-8 flex items-center mt-20 md:flex-col md:bg-transparent w-full md:px-4">
      <input
        placeholder="Enter Transaction Id"
        className="w-full text-lg outline-none py-5 bg-white px-3 rounded-lg"
        style={{ color: "#C4C4C4" }}
        value={txid}
        onChange={(e) => setTxId(e.target.value)}
      />
      <button
        style={{ backgroundColor: "#68C5CC" }}
        className="text-white p-4 text-base min-w-fit rounded md:mt-4"
        onClick={() => getReceipt()}
      >
        Generate Receipt
      </button>
    </div>
  );
};
export default Search;
