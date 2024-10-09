interface TossModalProps {
    isOpen: boolean;
    onClose: () => void;
    onToss: (choice: string) => void;
    tossResult: string;
  }
  
  const TossModal: React.FC<TossModalProps> = ({ isOpen, onClose, onToss, tossResult }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal fixed z-50 left-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div onClick={onClose} className="w-full h-full fixed z-10"></div>
        <div className="modal-content bg-white rounded-lg p-6 z-20">
          <h2 className="text-2xl font-semibold mb-4">Toss</h2>
          <p className="mb-4">Select Heads or Tails:</p>
          <div className="flex justify-center gap-4 mb-4">
            <button onClick={() => onToss('Heads')} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800">Heads</button>
            <button onClick={() => onToss('Tails')} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800">Tails</button>
          </div>
          <p className="text-lg font-semibold">{tossResult}</p>
          <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 w-full rounded hover:bg-red-800">Close</button>
        </div>
      </div>
    );
  };
  
  export default TossModal;
  