import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTeams } from "@microsoft/teamsfx-react";

const THEME_MAP = new Map<string, string>([
  ["default", "normal_theme"],
  ["dark", "dark_theme"],
  ["contrast", "contrast_theme"],
]);
type TParams = { Url: string };
const THEME_PARAMETER_NAME = "ui-theme";

export default function WebsiteTab(): ReactElement {
  const params = useParams<TParams>();
  const [themeString, setThemeString] = useState("default");
  const { inTeams } = useTeams({
    initialTheme: "default",
    setThemeHandler: (theme?: string) => {
      setThemeString(theme ?? "default");
    },
  })[0];
  alert(inTeams);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const nextUrl = new URL(decodeURIComponent(params.Url));
    const theme = THEME_MAP.get(themeString);
    if (theme) nextUrl.searchParams.set(THEME_PARAMETER_NAME, theme);
    setUrl(nextUrl.toString());
  }, [themeString, params.Url]);

  return <div>{url}</div>;
}
