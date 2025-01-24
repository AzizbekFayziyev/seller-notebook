import { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const EditStatus = ({ i, setStatusTab, deleteOrderFunc }) => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
	const [checked, setCheked] = useState(i?.data()?.status);

	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	const changeStatus = async () => {
		const ordersRef = doc(db, "orders", i.id);

		setStatusTab(checked);

		await setDoc(
			ordersRef,
			{
				status: checked,
			},
			{ merge: true }
		);

		toggleDrawer();
	};

	const openConfirmModal = () => {
		setConfirmModalOpen(true);
		toggleDrawer()
	};

	const closeConfirmModal = () => {
		setConfirmModalOpen(false);
	};

	const deleteOrder = async () => {
		deleteOrderFunc(i.id)
		closeConfirmModal();
		toggleDrawer();
	};

	return (
		<div className="relative rounded-[12px] bg-gray-100">
			<div
				onClick={toggleDrawer}
				className="flex-1 text-[#0084ff] stroke-[#0085FF] hover:stroke-white hover:text-white cursor-pointer transition-all duration-300 hover:bg-[#0084ff] py-3 bg-white rounded-xl border border-[#0084ff] justify-center items-center gap-3 flex"
			>
				<div className="text-sm font-medium">Change status</div>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
					<path d="M5.8335 10.5H14.1668M14.1668 10.5L10.8335 7.16669M14.1668 10.5L10.8335 13.8334" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>

			{/* Drawer */}
			<div className={`fixed max-w-[550px] mx-auto left-1/2 transform -translate-x-1/2 bottom-0 w-full bg-white px-[16px] pt-[8px] pb-[25px] rounded-t-[24px] shadow-lg transition-transform duration-500 ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}`} style={{ zIndex: 1000 }}>
				<div className="flex justify-center">
					<div className="w-[124px] h-1.5 bg-[#f5f5f7] rounded-[28px]" />
				</div>
				<div className="w-full mt-[12px] justify-start items-center gap-2 inline-flex">
					<div className="flex-1 text-[#141414] text-base font-medium">Edit status</div>
					<div onClick={toggleDrawer} className="flex justify-end">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M17.657 17.6568L12.0001 12M12.0001 12L6.34326 6.34314M12.0001 12L17.657 6.34314M12.0001 12L6.34326 17.6568" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
				</div>

				{/* Radio buttons */}
				<div className="w-full mt-[17px] flex-col justify-start items-start gap-2 inline-flex">
					{/* Status options */}
					{["New", "Process", "Completed", "Cold"].map((status, index) => (
						<div key={index} className="form-control w-full flex justify-between items-center">
							<label className="label w-full cursor-pointer">
								<div className={`flex-1 font-medium text-[${status === "New" ? "#1878f3" : status === "Process" ? "#781ecd" : status === "Completed" ? "#009a10" : "#ff000c"}]`}>
									{status}
								</div>
								<input onChange={() => setCheked(status)} checked={checked === status} type="radio" name="radio-10" className={`radio radio-sm checked:bg-[${status === "New" ? "#1878f3" : status === "Process" ? "#781ecd" : status === "Completed" ? "#009a10" : "#ff000c"}]`} />
							</label>
						</div>
					))}
				</div>

				<div onClick={changeStatus} className="flex-1 mt-[16px] text-white hover:text-[#0084ff] cursor-pointer transition-all duration-300 bg-[#0084ff] py-3 hover:bg-white rounded-xl border border-[#0084ff] justify-center items-center gap-3 flex">
					<div className="text-sm font-medium">Save</div>
				</div>

				<div onClick={openConfirmModal} className="flex-1 mt-[16px] text-white hover:text-[#fff] cursor-pointer transition-all duration-300 bg-[#FF0000] py-3 hover:bg-[#FF0000] rounded-xl justify-center items-center gap-3 flex">
					<div className="text-sm font-medium">Delete</div>
				</div>
			</div>

			{isDrawerOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" style={{ zIndex: 999 }}></div>}

			{isConfirmModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white rounded-xl p-6 text-center max-w-[400px] w-full">
						<h2 className="text-lg font-medium mb-4">Are you sure?</h2>
						<p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
						<div className="flex justify-between items-center gap-4">
							<button onClick={closeConfirmModal} className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg">
								Cancel
							</button>
							<button onClick={deleteOrder} className="flex-1 py-2 bg-red-500 text-white rounded-lg">
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditStatus;