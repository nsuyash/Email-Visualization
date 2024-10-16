const dateAndTimeFinder = (dateInUnix) => {
  const date = new Date(dateInUnix)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {year, month, day, hours, minutes}
}

export default dateAndTimeFinder;