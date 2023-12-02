import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaLinkedin,
  FaReact,
  FaNode,
} from "react-icons/fa";
import { SiTailwindcss, SiExpress } from "react-icons/si";
export default function About() {
  return (
    <div className="my-2 flex flex-col w-full items-center gap-2">
      <div className="p-5 text-white max-w-[570px] w-[90%] bg-center bg-no-repeat bg-[url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-R2C3wT9Xjw3j5V59CYqir__FVx556uGzqvB4dell6O06aKkGqMtLvJGLRy013XeY2N_W_RwZlkQAUJ9LZCtnGT1hmR4a76QRwrfNR2-1n_KswxEs-bKJUICCUmdD7TNzUvC7Q7Zc0yOjGmEsDMOBYXcWeoGkP-21pfcEJcNd07oRmgjeT1Z04EKau6U/w573-h381/Leonardo_Diffusion_XL_four_players_play_card_game_2.jpg')] bg-gray-700 bg-blend-multiply rounded-lg">
        <h1 className="font-bold text-xl">ABOUT OMIGAME</h1>
        <p className="font-light">
          Welcome to the OMIGAME inspired by the classic Sri Lankan card game,
          Omi! Designed for four players, the objective is simple yet
          engaging—be the first team to score above 10 points to claim victory.
          The game not only pays homage to the traditional Omi experience but
          also introduces a digital dimension for a seamless and enjoyable
          multiplayer experience. Join in the fun as you navigate through the
          strategic intricacies of Omi, embracing the challenge and excitement
          of this timeless card game in an online setting.{" "}
          <Link
            className="text-green-700 underline"
            to="https://www.pagat.com/whist/omi.html"
          >
            Omi A-Z guide
          </Link>
        </p>
      </div>
      <div className="p-5 max-w-[570px] w-[90%] rounded-lg">
        <h1 className="font-bold text-xl">ABOUT PROJECT</h1>
        <p className="font-light">
          A multiplayer online card game has been crafted using React and
          Nodejs. The game accommodates four players simultaneously and
          incorporates various libraries and frameworks to enhance the gaming
          experience.
        </p>
        <div className="flex text-5xl justify-evenly">
          <FaReact />
          <FaNode />
          <SiExpress />
          <SiTailwindcss />
        </div>
      </div>
      <div className="p-5 max-w-[570px] w-[90%] rounded-lg bg-gray-800 text-gray-400 flex flex-col gap-1">
        <h1 className="font-bold text-xl ">DEVELOPER</h1>
        <div className="flex gap-1 items-center">
          <img
            className="w-[30%] rounded-lg "
            src={require("./myLogo.jpg")}
            alt=""
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-200">Nipun Avishka De Zoysa</h1>
            <p className="text-sm">
              Undergraduate | BSc (Hons) In Computer Science
            </p>
            <p className="flex gap-1 text-lg">
              <Link
                to="https://github.com/nipun-dezoysa"
                className="hover:text-green-700"
              >
                <FaGithubSquare />
              </Link>
              <Link
                to="https://www.linkedin.com/in/nipun-avishka-de-zoysa/"
                className="hover:text-green-700"
              >
                <FaLinkedin />
              </Link>
              <Link
                to="https://www.facebook.com/nipun.avishka.90"
                className="hover:text-green-700"
              >
                <FaFacebookSquare />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
