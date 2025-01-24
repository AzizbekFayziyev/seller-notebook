import { db, app } from "../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddProperty from "../components/AddProperty";

const CreateOrder = ({ regions, users, orders }) => {
	const navigate = useNavigate();

	const searchParams = new URLSearchParams(window.location.search);

	const [isLoading, setLoading] = useState(false);

	const [client, setClient] = useState("");
	const [state, setState] = useState("select (PA/NJ/NY)");
	const [rooms_count, setRooms_count] = useState("");
	const [budget, setBudget] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const [properties, setProperties] = useState([]);

	const [data, setData] = useState()

	useEffect(() => {
		if (searchParams.has("id")) {
			const dataLocal = orders?.docs.filter(i => i.id == searchParams.get("id"))[0]		
			
			setData(dataLocal)

			setClient(dataLocal?.data().client);
			setState(dataLocal?.data().location);
			setRooms_count(dataLocal?.data().rooms_count);
			setBudget(dataLocal?.data().budget);
			setPhoneNumber(dataLocal?.data().phone);

			setProperties(dataLocal?.data().arguments)
		} 
	}, []);

	const createOrder = async () => {
		if (!isLoading) {
			setLoading(true);
			const ordersRef = doc(db, "orders", searchParams.has("id") ? searchParams.get("id") : `${new Date().getTime()}`);

			await setDoc(
				ordersRef,
				{
					author: searchParams.has("id") ? data?.data().author : users?.docs.filter((i) => i.data().email == localStorage.getItem("email").toLowerCase())[0].data().fullname,
					budget: budget,
					client: client,
					date: searchParams.has("id") ? data?.data().date : `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()} | ${new Date().getHours()}:${new Date().getMinutes()}`,
					location: state,
					order_count: searchParams.has("id") ? data?.data().order_count : orders?.docs[0]?.data()?.order_count ? parseInt(orders.docs[orders.docs.length - 1].data().order_count) + 1 : 1,
					phone: phoneNumber,
					rooms_count: rooms_count,
					status: searchParams.has("id") ? data?.data().status : "New",
					arguments: properties,
				},
				{ merge: true }
			);

			navigate("/");

			setLoading(false);
		}
	};

	return (
		<div className="overflow-scroll h-dvh">
			<div className="my-[35px]">
				<div className="max-w-[550px] mx-auto px-[16px]">
					<Link to={"/"} className="w-full transition-all duration-300 hover:translate-x-1 cursor-pointer pb-[18px] justify-start items-center gap-4 flex">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
							<path d="M13.3333 21.3333L8 16M8 16L13.3333 10.6667M8 16L24 16" stroke="#28303F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						<div className="text-[#1b1b29] text-lg font-semibold">Create order</div>
					</Link>
				</div>

				<div className="overflow-auto min-h-dvh">
					<div className="h-[22px] bg-[#E9EAED] w-full"></div>

					<div className="max-w-[550px] mx-auto w-full p-4 bg-white flex-col justify-start items-start flex">
						<div className="w-full">
							<AddProperty setProperties={setProperties} />
						</div>

						<div className="w-full mt-[12px] flex-col justify-start items-start gap-2 flex">
							<div className="self-stretch justify-start items-start gap-1 inline-flex">
								<div className="grow shrink basis-0 text-[#141414] text-base font-medium">Client name</div>
							</div>
							<input value={client} onChange={(e) => setClient(e.target.value)} type="text" placeholder="Alex" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex" />
						</div>

						<div className="w-full mt-[12px] flex-col justify-start items-start gap-2 flex">
							<div className="self-stretch justify-start items-start gap-1 inline-flex">
								<div className="grow shrink basis-0 text-[#141414] text-base font-medium">State name</div>
							</div>
							<div className="dropdown w-full dropdown-end">
								<div tabIndex={0} role="button" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex">
									{state}
								</div>
								<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow">
									{regions?.docs.map((i) => (
										<li
											onClick={() => {
												setState(i.data().name);
												document.activeElement.blur();
											}}
										>
											<a>{i.data().name}</a>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="w-full mt-[12px] flex-col justify-start items-start gap-2 flex">
							<div className="self-stretch justify-start items-start gap-1 inline-flex">
								<div className="grow shrink basis-0 text-[#141414] text-base font-medium">Rooms count</div>
							</div>
							<input value={rooms_count} onChange={(e) => setRooms_count(e.target.value)} type="text" placeholder="5" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex" />
						</div>

						<div className="w-full mt-[12px] flex-col justify-start items-start gap-2 flex">
							<div className="self-stretch justify-start items-start gap-1 inline-flex">
								<div className="grow shrink basis-0 text-[#141414] text-base font-medium">Budget</div>
							</div>
							<input value={budget} onChange={(e) => setBudget(e.target.value)} type="text" placeholder="$300 000" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex" />
						</div>

						<div className="w-full mt-[12px] flex-col justify-start items-start gap-2 flex">
							<div className="self-stretch justify-start items-start gap-1 inline-flex">
								<div className="grow shrink basis-0 text-[#141414] text-base font-medium">Phone number</div>
							</div>
							<input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Phone number" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex" />
						</div>

						{properties.map((i, index) => (
							<div className="w-full mt-[12px] flex-col justify-start items-start gap-2 flex">
								<div className="self-stretch justify-start items-start gap-1 inline-flex">
									<div className="grow shrink basis-0 text-[#141414] text-base font-medium">{i.title}</div>
								</div>
								<input
									value={i.value}
									onChange={(e) => {
										const updatedProperties = [...properties];
										updatedProperties[index].value = e.target.value;
										setProperties(updatedProperties);
									}}
									type="text"
									placeholder={i.title}
									className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex"
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="relative max-w-[550px] mx-auto bg-white w-full bottom-5 left-0">
				<div className="py-[16px] w-full px-4 justify-start items-start gap-3 inline-flex">
					<Link to={"/"} className="flex-1  mx-auto transition-all cursor-pointer duration-300 hover:bg-[#e7e7e9] h-11 px-6 py-4 bg-[#f5f5f7] rounded-xl justify-center items-center flex">
						<div className="text-center text-[#ff0000] text-base font-medium font-['TT Interfaces'] leading-snug">Cancel</div>
					</Link>
					{client && state != "select (PA/NJ/NY)" && (
						<button onClick={createOrder} type="submit" className="flex-1 transition-all cursor-pointer duration-300 hover:bg-[#5456df] h-11 px-6 py-4 bg-[#5d5fef] rounded-xl justify-center items-center flex text-white">
							{isLoading && <span className="loading loading-spinner"></span>}
							Save
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreateOrder;
