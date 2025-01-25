import { useEffect, useState } from "react";
import { db, app } from "../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import MoreDrawer from "../components/MoreDrawer";
import { Link } from "react-router-dom";
import EditStatus from "../components/EditStatus";
import ProfileInfo from "../components/ProfileInfo";

const Home = ({ regions, orders, users }) => {
	const [tab, setTab] = useState(0);

	const [statusTab, setStatusTab] = useState("New");

	useEffect(() => {
		setTab(regions?.docs[0].data().name);
	}, [regions]);

	const [search, setSearch] = useState();

	const deleteOrder = async (id) => {
		await deleteDoc(doc(db, "orders", id));
	};

	return (
		<div>
			<div>
				<div className="max-w-[550px] mx-auto pt-[15.5px] w-full px-4 justify-start items-center gap-4 flex">
					<div className="py-[12px] flex-1 text-center text-[#141414] text-lg font-semibold">Home page</div>
				</div>

				<div className="md:h-[27px] h-[17px] bg-[#E9EAED] w-full"></div>

				<div className="max-w-[550px] mx-auto w-full px-4 py-2 bg-white border-t border-[#e3e6ea] justify-between items-start gap-2.5 flex">
					{regions?.docs.map((i) => (
						<div
							onClick={() => {
								setTab(i.data().name);
								setSearch("");
								setStatusTab("New");
							}}
							className={`${tab == i.data().name ? "bg-[#0084ff] text-white " : "bg-[#e9eaed] text-black "} flex-1 cursor-pointer h-[38px] p-1 rounded-md justify-start items-center gap-2.5 flex`}
						>
							<div className="flex-1 text-center font-medium">{i.data().name}</div>
						</div>
					))}
				</div>

				<div className="md:h-[22px] h-[12px] bg-[#E9EAED] w-full"></div>

				<div className="max-w-[550px] mx-auto w-full px-4 py-2 bg-white border-t border-[#e3e6ea] justify-between items-start gap-2.5 flex">
					<div onClick={() => setStatusTab("New")} className={`${statusTab != "New" ? "opacity-50 " : " border border-[#0000002d] "} transition-all duration-200 cursor-pointer flex-1 p-1 bg-[#eef9ff] rounded-md border border-[#d5f2ff] justify-start items-center gap-2.5 flex`}>
						<div className="flex-1 text-center text-[#1878f3] font-medium">New</div>
					</div>

					<div onClick={() => setStatusTab("Process")} className={`${statusTab != "Process" ? "opacity-50 " : " border border-[#0000002d] "} transition-all duration-200 cursor-pointer flex-1 p-1 bg-[#f0e4ff] rounded-md border border-[#e5d1ff] justify-start items-center gap-2.5 flex`}>
						<div className="flex-1 text-center text-[#781ecd] font-medium">Process</div>
					</div>

					<div onClick={() => setStatusTab("Completed")} className={`${statusTab != "Completed" ? "opacity-50 " : " border border-[#0000002d] "} transition-all duration-200 cursor-pointer flex-1 p-1 bg-[#effff1] rounded-md border border-[#ffe6d1] justify-start items-center gap-2.5 flex`}>
						<div className="flex-1 text-center text-[#009a10] font-medium">Completed</div>
					</div>

					<div onClick={() => setStatusTab("Cold")} className={`${statusTab != "Cold" ? "opacity-50 " : " border border-[#0000002d] "} transition-all duration-200 cursor-pointer flex-1 p-1 bg-[#ffecec] rounded-md border border-[#ffd1d1] justify-start items-center gap-2.5 flex`}>
						<div className="flex-1 text-center text-[#ff0000] font-medium">Cold</div>
					</div>
				</div>

				<div className="flex max-w-[550px] mx-auto justify-center mt-3 opacity-80">
					{!orders?.docs.filter((item) => {
						if (statusTab == item.data().status) {
							if (item.data().location == tab) {
								return item;
							}
						}
					})[0] && <p>No orders yet</p>}
				</div>

				{orders?.docs.filter((item) => {
					if (statusTab == item.data().status) {
						if (item.data().location == tab) {
							return item;
						}
					}
				})[0] && (
						<div className="-mt-2.5 px-[15px] py-[10px] bg-[#E9EAED] w-full">
							<div className="flex max-w-[550px] mx-auto px-[24px] py-[14px] justify-between items-center bg-[#F5F5F7] border border-[#C2C2C3] rounded-[12px]">
								<input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="flex-1 outline-none bg-transparent h-full" placeholder="Search oder" />
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
									<g clip-path="url(#clip0_6073_1084)">
										<path d="M18.3333 18.3333L16.6667 16.6667M1.66663 9.58332C1.66663 5.21107 5.21104 1.66666 9.58329 1.66666C13.9555 1.66666 17.5 5.21107 17.5 9.58332C17.5 13.9556 13.9555 17.5 9.58329 17.5C5.21104 17.5 1.66663 13.9556 1.66663 9.58332Z" stroke="#272727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
									</g>
									<defs>
										<clipPath id="clip0_6073_1084">
											<rect width="20" height="20" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>
					)}

				<div className="max-w-[550px] mx-auto max-h-dvh overflow-auto pb-[375px]">
					{orders?.docs
						.filter((item) => {
							if (statusTab === item.data().status) {
								if (item.data().location === tab) {
									if (!search) {
										return item;
									} else {
										if (String(item.data()?.location)?.toLowerCase().includes(search.toLowerCase()) || String(item.data()?.client)?.toLowerCase().includes(search.toLowerCase()) || String(item.data()?.order_count)?.toLowerCase().includes(search.toLowerCase()) || String(item.data()?.date)?.toLowerCase().includes(search.toLowerCase()) || String(item.data()?.budget)?.toLowerCase().includes(search.toLowerCase()) || String(item.data()?.author)?.toLowerCase().includes(search.toLowerCase()) || String(item.data()?.phone)?.toLowerCase().includes(search.toLowerCase())) {
											return item;
										}
									}
								}
							}
						})
						.reverse()
						.map((i, index, arr) => (
							<div key={i.id}>
								<div className="w-full bg-white rounded-lg flex-col justify-start items-start gap-4 inline-flex overflow-hidden">
									<div className="self-stretch p-4 border-b border-[#e3e6ea] justify-start items-center gap-4 inline-flex">
										<div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
											<div className="text-[#141414] text-base font-medium font-['Golos Text'] leading-snug">Order №{i.data().order_count}</div>
											<div className="justify-start items-center gap-2 inline-flex">
												<div className="text-[#6b6b6e] text-xs font-normal font-['Golos Text'] leading-[18px]">{i.data().date}</div>
											</div>
										</div>
										<div
											className={`
												${i.data().status === "New" && " text-[#1878f3] bg-[#eefaff] "} 
												${i.data().status === "Process" && " text-[#781ecd] bg-[#f0e4ff] "} 
												${i.data().status === "Completed" && " text-[#009a10] bg-[#effff1] "} 
												${i.data().status === "Cold" && " text-[#ff0000] bg-[#ffecec] "} 
												px-2 py-1 rounded-lg border border-[#ffe6d1] justify-center items-center gap-2 flex`}
										>
											<div className={`text-right text-xs font-medium font-['Golos Text'] leading-[18px]`}>{i.data().status}</div>
										</div>
									</div>

									<div className="self-stretch h-[89px] px-4 flex-col justify-start items-start gap-4 flex">
										<div className="self-stretch justify-between items-center inline-flex">
											<div className="text-[#141414] text-[15px] font-normal font-['Inter'] leading-tight">Client:</div>
											<div className="text-[#141414] text-[15px] font-medium font-['TT Interfaces'] leading-tight">{i.data().client}</div>
										</div>
										<div className="self-stretch justify-between items-center inline-flex">
											<div className="text-[#141414] text-[15px] font-normal font-['Inter'] leading-tight">Phone:</div>
											<div className="text-[#141414] text-[15px] font-medium font-['TT Interfaces'] leading-tight">{i.data().phone}</div>
										</div>
										<div className="self-stretch justify-between items-center inline-flex">
											<div className="text-[#141414] text-[15px] font-normal font-['Inter'] leading-tight">Location:</div>
											<div className="text-[#141414] text-[15px] font-medium font-['TT Interfaces'] leading-tight">{i.data().location}</div>
										</div>
									</div>

									<div className="w-full px-4 pb-4 justify-start items-center gap-2.5 flex">
										<div className="flex-1">
											<MoreDrawer i={i} />
										</div>
										<div className="flex-1">
											<EditStatus deleteOrderFunc={deleteOrder} setStatusTab={setStatusTab} i={i} />
										</div>
									</div>
								</div>

								{index !== arr.length - 1 && <div className="h-[25px] bg-[#E9EAED] w-full"></div>}
							</div>
						))}
				</div>
			</div>

			<div className="fixed bottom-0 bg-white left-0 w-full justify-center items-end gap-1 flex py-[18px] mt-[18px]">
				<Link to={"/"} className="w-[72px] flex-col justify-start items-center gap-1 inline-flex">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M4.81944 7.20818C7.72827 4.28816 9.18269 2.82814 10.9319 2.49746C11.6377 2.36402 12.3623 2.36402 13.0681 2.49746C14.8173 2.82814 16.2717 4.28816 19.1806 7.20818C20.2758 8.30763 20.8234 8.85735 21.1741 9.5232C21.3186 9.7976 21.4372 10.0848 21.5285 10.3812C21.75 11.1004 21.75 11.8764 21.75 13.4282V18.5C21.75 20.2949 20.2949 21.75 18.5 21.75C16.7051 21.75 15.25 20.2949 15.25 18.5V17.3875C15.25 15.5926 13.7949 14.1375 12 14.1375C10.2051 14.1375 8.75 15.5926 8.75 17.3875V18.5C8.75 20.2949 7.29493 21.75 5.5 21.75C3.70507 21.75 2.25 20.2949 2.25 18.5V13.4282C2.25 11.8764 2.25 11.1004 2.47151 10.3812C2.56279 10.0848 2.68144 9.7976 2.82594 9.5232C3.17659 8.85735 3.7242 8.30763 4.81944 7.20818Z" fill="#ABABAE" />
					</svg>
					<div className="self-stretch text-center text-[#ababae] text-xs font-medium">Main</div>
				</Link>

				<Link to={"/create-order"} className="p-3.5 bg-[#0084ff] hover:bg-[#3788d3] cursor-pointer transition-all duration-300 rounded-[31px] shadow-[inset_0px_0px_12px_0px_rgba(255,255,255,0.24)] border-2 border-white/30 justify-start items-center gap-2 flex">
					<div className="w-6 h-6 relative">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75ZM12.75 8.5C12.75 8.08579 12.4142 7.75 12 7.75C11.5858 7.75 11.25 8.08579 11.25 8.5V11.25H8.5C8.08579 11.25 7.75 11.5858 7.75 12C7.75 12.4142 8.08579 12.75 8.5 12.75H11.25V15.5C11.25 15.9142 11.5858 16.25 12 16.25C12.4142 16.25 12.75 15.9142 12.75 15.5V12.75H15.5C15.9142 12.75 16.25 12.4142 16.25 12C16.25 11.5858 15.9142 11.25 15.5 11.25H12.75V8.5Z" fill="white" />
						</svg>
					</div>
				</Link>

				<ProfileInfo users={users} />
			</div>
		</div>
	);
};

export default Home;
