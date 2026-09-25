// Gandi Format (from RemixWarp, id=tools)
class Block {
  getInfo() {
    return {
      id: 'tools',
      name: '工具',
      blocks: [
        {
          opcode: 'endl',
          blockType: Scratch.BlockType.REPORTER,
          text: '换行'
        }
      ]
    };
  }
 
  endl() {
    return '\n';
  }
}
 
Scratch.extensions.register(new Block());