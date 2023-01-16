export const configsInitialState = {
  title: "",
  description: "Demo Gamebook of the Game Engine for Ebooks",
  coverImage: "",
  creator: "OMITTED",

  titleSection: "",
  navSection: "Introduction",

  content: "code.omitted.org.genebook",
  language: "pt-BR",
  created: "",
  modified: "",
  attributionURL: "http://www.omitted.org.br/genebook/",
};

export default function () {
  return {
    configs: { ...JSON.parse(JSON.stringify(configsInitialState)) },
  };
}
