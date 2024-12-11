import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { CloseSvg } from "../assets/svgs";
// fancy ahh ompound component
// basically everything is handled in this file so when you use it inside another component, everything is uber smooth

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");
	const close = () => setOpenName("");
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens: opensWindowName }) {
	const { open } = useContext(ModalContext);

	return cloneElement(children, {
		onClick: () => {
			open(opensWindowName);
		},
	});
}

function Window({ children, name }) {
	const { openName, close } = useContext(ModalContext);

	const ref = useOutsideClick(close);

	if (name !== openName) return null;

	return createPortal(
		// render on top of the dom tree so it's not affected by some inherited overflow:hidden

		<div className="overlay">
			<div className="modal" ref={ref}>
				<button onClick={close} className="modal__close">
					<CloseSvg />
				</button>
				{/* cloneElement creates a new element that is a copy of the original, with additional props applied*/}
				{/* extend 'children', add onCloseModal prop to it */}
				{cloneElement(children, { onCloseModal: close })}
			</div>
		</div>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
