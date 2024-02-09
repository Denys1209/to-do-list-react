export default class Deal {
 constructor(id, time, name, priority, content, tags) {
    this.id = id;
    this.time = time;
    this.name = name;
    this.priority = priority;
    this.content = content;
    this.tags = tags;
 }

 static createFromSnap(data)
 {
   return new Deal(
      data.id,
      data.time, 
      data.name, 
      data.priority,
      data.content,
      data.tags,
   );
 }

}
