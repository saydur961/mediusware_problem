
export const Fetch = async ({url}) => {


  const resS = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }

  });

  if (!resS.ok) {
    const errRes = await resS.json();
    throw new Error(errRes || 'error');
  }

  const resSData = await resS.json();
  return resSData;
}