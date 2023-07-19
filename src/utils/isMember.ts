function isMember<T>(main: T[], child: T) {
  return main.filter((e) => e === child).length > 0;
}

export default isMember;
