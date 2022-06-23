import { IGameObject, ISize, Sprite } from './types'

export class Canvas {
  content: string[][] = []
  objects: IGameObject[] = []

  constructor(
    private readonly size: ISize,
    private readonly sprite: Sprite = '⬛'
  ) {
    this.create()
  }

  public addObject(object: IGameObject) {
    object.setBoundries(this.size.width, this.size.height)
    this.objects.push(object)
    return this
  }

  private create() {
    const content: string[][] = []

    for (let x = 0; x < this.size.height; x++) {
      content.push([])
      for (let y = 0; y < this.size.width; y++) {
        content[x].push(this.sprite)
      }
    }

    this.content = content
  }

  public render(frameRate: number = 30) {
    setInterval(() => {
      this.create()
      console.clear()

      for (const object of this.objects) {
        for (
          let y = object.position.y;
          y < object.position.y + object.size.height;
          y++
        ) {
          for (
            let x = object.position.x;
            x < object.position.x + object.size.width;
            x++
          ) {
            this.content[y][x] = object.sprite
          }
        }
      }

      for (let x = 0; x < this.content.length; x++) {
        let row = ''
        for (let y = 0; y < this.content[x].length; y++) {
          row += this.content[x][y]
        }
        console.log(row)
      }
    }, 1000 / frameRate)
  }
}
