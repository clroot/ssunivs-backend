class UserNotFoundException extends Error {
  constructor(message = '게시글을 찾을 수 없습니다.') {
    super(message);
    this.name = this.constructor.name;
  }
}

export default UserNotFoundException;