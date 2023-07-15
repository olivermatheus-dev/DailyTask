import React, { useState, useRef, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";

export default function ButtonModalNewTaskForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (event) => {
    // Verifica se o clique ocorre fora do modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    // Adiciona o evento de clique fora do modal quando o componente é montado
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove o evento de clique fora do modal quando o componente é desmontado
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // O array de dependências vazio garante que o efeito seja executado apenas uma vez

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={openModal}
          className="bg-[#6D4AB7] rounded-lg w-96 h-16 p-4 shadow-md text-[#1C1B1F] font-medium text-base"
        >
          New Task
        </button>
        <div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center">
              <div className="relative" ref={modalRef}>
                <NewTaskForm />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
