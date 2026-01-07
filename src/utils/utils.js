export const setLocalData = (userMovieData, userData) => {

  const index = userData.findIndex(i => i.id === userMovieData.id);
  (index !== -1) ? userData[index] = {...userData[index], ...userMovieData} : userData.push(userMovieData);

  localStorage.setItem("userData", JSON.stringify(userData))
}

export const isEven = (number) => {
  return number % 2 === 0
}