export default function transformBigInt(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(transformBigInt);
  } else if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const key in obj) {
      result[key] = transformBigInt(obj[key]);
    }
    return result;
  } else if (typeof obj === 'bigint') {
    return obj.toString();
  }
  return obj;
}