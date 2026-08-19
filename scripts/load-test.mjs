const count=Number(process.env.LEAD_COUNT??10_000); const batch=250; const start=performance.now();
let checksum=0; for(let i=0;i<count;i+=batch){const payload=Array.from({length:Math.min(batch,count-i)},(_,n)=>({name:`Lead ${i+n}`,placeId:`place-${i+n}`}));checksum+=JSON.stringify(payload).length}
console.log(JSON.stringify({leads:count,batches:Math.ceil(count/batch),payloadBytes:checksum,generationMs:Math.round(performance.now()-start)}));
