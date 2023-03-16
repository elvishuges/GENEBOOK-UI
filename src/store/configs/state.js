export const configsInitialState = {
  title: "Gamebook",
  description: "Demo Gamebook of the Game Engine for Ebooks",
  coverImage: "",
  creator: "OMITTED",

  titleSection: "Gamebook",
  navSection: "Introduction",

  content: "code.omitted.org.genebook",
  language: "pt-BR",
  created: new Date().toISOString().slice(0, 10),
  modified: new Date().toISOString().slice(0, 10),
  attributionURL: "http://www.omitted.org.br/genebook/",
};

export default function () {
  return {
    configs: { ...JSON.parse(JSON.stringify(configsInitialState)) },
  };
}
