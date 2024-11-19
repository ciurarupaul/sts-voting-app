import { useAuthContext } from "../context/authContext.jsx";
import truncateText from "../utils/truncateText.js";
import { GoInfo } from "react-icons/go";

const mockPlay = {
	title: "Knockout",
	image: "/knockout.jpg",
	description: `Liniștea asurzitoare este spartă de note blânde de pian, privirea publicului fiind captată de un domn elegant ce se prezintă drept Profesorul Charlie Sharp. Se recomandă ca pasionat de știință, ce-i drept, una mai puțin cunoscută în zilele noastre, știință pe care o veți afla pe parcursul spectacolului. Domnul Sharp este naratorul care ne prezintă povestea unor eroine din epoca victoriană. Pot spune că este chiar mentorul celor patru doamne ce își vor lăsa amprenta asupra societății.

  Au existat multe femei ce s-au sacrificat și au suferit pentru a recăpăta ceea ce le-a fost luat pe nedrept. Violeta Hunter, Matilda Blackwell, Ana Lamb și Polly Stokes aleg să spargă tiparul, să renunțe la aparențe și să schimbe istoria odată pentru totdeauna.
  
  Violeta Hunter este o tânără infirmieră ce visează să descopere tainele medicinii, însă pentru realizarea acestei dorințe se confruntă cu diverse probleme. Deși viitorul pare să îi rezerve cu totul altceva, ea nu renunță și caută o cale de a-și atinge scopul. Întâlnirea cu Profesorul Charlie Sharp în clinica doctorului James Bell o va conduce la Londra, unde va avea oportunitatea de a trata rănile boxerilor ce au încasat lovituri zdravene în ringul de box. Totuși, lipsa banilor necesari pentru a-și plăti studiile o va constrânge să își ia inima în dinți și să învețe dulcea știință de a lăsa vânătăi.`,
	stsLink: "https://sts.sisc.ro/Blog/Knockout25.html",
};

function VotePage() {
	const { authState, castVoteInContext } = useAuthContext();

	async function handleCastVote(option) {
		try {
			await castVoteInContext(option);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="content-container votePage__container">
			<div className="votePage__presentation">
				{/* play presentation */}
				<img
					src={mockPlay.image}
					className="votePage__presentation-image"
				/>
				<div className="votePage__presentation-title">
					{mockPlay.title}
				</div>
				{/* will later calc the num of words based on device height -- somehow */}
				<div className="votePage__presentation-description">
					{truncateText(mockPlay.description, 300)}
					...
					<a
						className="votePage__presentation-description-redirect"
						onClick={() => window.open(mockPlay.stsLink, "_blank")}
					>
						{" "}
						See more
					</a>
				</div>
			</div>

			{/* voting section */}
			<div className="votePage__vote">
				{authState.isAllowedToVote ? (
					<div className="votePage__vote-title">
						Votează <GoInfo />
						{/* will add info modal here */}
					</div>
				) : (
					<div className="votePage__vote-title">
						Vot deja înregistrat <GoInfo />
					</div>
				)}
				<div className="votePage__vote-btns">
					<button
						onClick={() => {
							handleCastVote("DA");
						}}
						disabled={!authState.isAllowedToVote}
					>
						DA
					</button>
					<button
						onClick={() => {
							handleCastVote("NU");
						}}
						disabled={!authState.isAllowedToVote}
					>
						NU
					</button>
				</div>
			</div>
		</div>
	);
}

export default VotePage;
