import style from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export function LoginBox() {
  const { user, signInUrl } = useContext(AuthContext);

  console.log(user);

  return (
    <div className={style.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={style.signInWithGithub}>
        <VscGithubInverted size={"24"} />
        Entra com Github
      </a>
    </div>
  );
}
