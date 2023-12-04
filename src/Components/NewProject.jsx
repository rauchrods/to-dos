import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

function NewProject({ onAdd,onCancel }) {
  const modalRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  function handleSave() {
    const enteredTitle = titleRef.current.value;
    const enteredDescrition = descriptionRef.current.value;
    const enteredDueDate = dateRef.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescrition.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modalRef.current.showModal();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescrition,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption='Okay'>
        <h2 className="text-xl font-bold text-stone-700 mt-4 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops.. looks lie you forgot to enter a value</p>
        <p className="text-stone-600 mb-4">make sure all values are filled</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
              cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              save
            </button>
          </li>
        </menu>
        <div>
          <Input label="Title" ref={titleRef} />
          <Input label="Description" textarea ref={descriptionRef} />
          <Input label="Due Date" ref={dateRef} type="date" />
        </div>
      </div>
    </>
  );
}

export default NewProject;
