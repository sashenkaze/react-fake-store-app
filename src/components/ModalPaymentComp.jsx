import { Modal } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";

export default function ModalPaymentComp({ open, onClose }) {
    return (
        <Modal show={open} onClose={onClose} dismissible size="sm">
            <div className="p-8 text-center">
                <FaCheckCircle className="mx-auto text-green-500 text-5xl mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">
                    Pembayaran Berhasil
                </h3>
            </div>  
        </Modal>
    );
}
