export default function mapPicCarousel(one, two, three) {
  if (one !== '') {
    const arr = [];
    arr.push({
      illustration: one,
    });
    if (two !== '') {
      arr.push({
        illustration: two,
      });
    }
    if (three !== '') {
      arr.push({
        illustration: three,
      });
    }
    return arr;
  }
}
