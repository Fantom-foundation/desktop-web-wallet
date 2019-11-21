export const readFileAsText = async (file: File): Promise<string> => {
  const text: string = await new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = ({ target: { result } }: any) => resolve(result);
    reader.readAsText(file);
  });

  return text;
}

export const readFileAsJSON = async (file: File): Promise<Record<string, any>> => {
  const json = await readFileAsText(file);

  return JSON.parse(json);
}