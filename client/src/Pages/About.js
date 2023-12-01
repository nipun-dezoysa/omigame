import { Link } from "react-router-dom";
export default function About(){
    return (
      <div className="mt-2 flex flex-col w-full items-center">
        <div className="p-5 text-white max-w-[570px] w-[90%] bg-center bg-no-repeat bg-[url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-R2C3wT9Xjw3j5V59CYqir__FVx556uGzqvB4dell6O06aKkGqMtLvJGLRy013XeY2N_W_RwZlkQAUJ9LZCtnGT1hmR4a76QRwrfNR2-1n_KswxEs-bKJUICCUmdD7TNzUvC7Q7Zc0yOjGmEsDMOBYXcWeoGkP-21pfcEJcNd07oRmgjeT1Z04EKau6U/w573-h381/Leonardo_Diffusion_XL_four_players_play_card_game_2.jpg')] bg-gray-700 bg-blend-multiply rounded-lg">
          <h1 className="font-bold text-xl">ABOUT OMIGAME</h1>
          <p className="font-light">
            Welcome to OMIGAME inspired by the classic Sri Lankan card game,
            Omi! Designed for four players, the objective is simple yet
            engaging—be the first team to score above 10 points to claim
            victory. The game not only pays homage to the traditional Omi
            experience but also introduces a digital dimension for a seamless
            and enjoyable multiplayer experience. Join in the fun as you
            navigate through the strategic intricacies of Omi, embracing the
            challenge and excitement of this timeless card game in an online
            setting.
          </p>
          <Link className="text-green-700 underline" to="https://www.pagat.com/whist/omi.html">Omi A-Z guide</Link>
        </div>
      </div>
    );
}