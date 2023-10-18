import React, { useState } from "react";
import Modal from "@/component/modal";

const ParentComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={openModal}>
        Launch demo modal
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default ParentComponent;
