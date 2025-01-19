import { useQueryClient } from '@tanstack/react-query';
import { ImageUploaderImperativeHandle } from 'components/shared/ImageUploader';
import { useRef, useState } from 'react';
import { postImage } from 'api/imageapi';
import { ImageUploader } from 'components/shared';
import { Button, Loader } from 'components/shared';
import * as S from 'styles/mypage/mypageStyled';
import { usePatchUser } from 'queries/users';
import { QueryKeys } from 'constant';
import { UserType } from 'types/userTypes';

const UserInfo = ({ userId, user }: { userId: string; user: UserType | null }) => {
  const [nicknameBtn, setNicknameBtn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwalert, setPwalert] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('');
  const imageRef = useRef<ImageUploaderImperativeHandle>(null);
  const queryClient = useQueryClient();

  const { mutate, error } = usePatchUser();

  const saveProfileImg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imageSrc) {
      alert('프로필 이미지를 선택하세요.');
      return;
    }
    const fileData = imageRef.current?.getFileData();
    if (fileData) {
      try {
        const res = await postImage(fileData[0]);
        setImageSrc(res.imagePath);
        mutate(
          { id: userId, profileImgPath: res.imagePath },
          {
            onSuccess: () => {
              alert('프로필 이미지가 성공적으로 변경되었습니다.');
              setImageSrc('');
            },
          },
        );
      } catch (error) {
        alert('이미지 업로드에 실패했습니다.');
      }
    } else {
      alert('파일이 없습니다.');
    }
  };

  const saveNickName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!nickname) {
      alert('닉네임을 입력하세요.');

      return;
    }
    mutate(
      { id: userId, nickname: nickname },
      {
        onSuccess: () => {
          alert('닉네임이 성공적으로 변경되었습니다.');
          queryClient.invalidateQueries([QueryKeys.USER_DATA]);
          setNickname('');
        },
      },
    );
  };
  const patchPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert('비밀번호와 비밀번호 확인을 입력하세요.');
      return;
    }
    if (password !== confirmPassword) {
      setPwalert(false);
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setPwalert(true);
    mutate(
      { id: userId, password: password },
      {
        onSuccess: () => {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          setPassword('');
          setConfirmPassword('');
        },
      },
    );
    if (error) {
      alert(error);
    }
  };
  return (
    <S.Section>
      <S.UserTable>
        <h1 className="tbody">내정보</h1>
        <form>
          <table>
            <tbody>
              <tr>
                <th>프로필 이미지 변경</th>
                <td>
                  <ImageUploader ref={imageRef} />
                  <S.ProfileImgBtnWrap>
                    <Button onClick={() => saveProfileImg}>프로필 이미지 변경</Button>
                  </S.ProfileImgBtnWrap>
                </td>
              </tr>
              <tr>
                <th>아이디(이메일)</th>
                <td>{user?.email}</td>
              </tr>
              <tr>
                <th>활동명</th>
                <td>
                  <div>
                    <span>{user?.nickname ? user.nickname : nickname}</span>
                    <Button type="button" onClick={() => setNicknameBtn(!nicknameBtn)}>
                      {nicknameBtn ? '활동명 변경 취소' : '활동명 변경'}
                    </Button>
                    <div style={{ display: nicknameBtn ? 'block' : 'none' }}>
                      <div className="changeNickname">
                        <input
                          placeholder="변경할 닉네임 입력"
                          onChange={(e) => setNickname(e.target.value)}
                        ></input>
                        <Button onClick={() => saveNickName}>닉네임 변경</Button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <th>비밀번호 변경</th>
                <td>
                  <div className="passwordtable">
                    <table>
                      <tbody>
                        <tr>
                          <th>새 비밀번호</th>
                          <td>
                            <input
                              onChange={(e) => setPassword(e.target.value)}
                              type="password"
                              disabled={true}
                            ></input>
                          </td>
                        </tr>
                        <tr>
                          <th>비밀번호 다시 입력</th>
                          <td>
                            <input
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              type="password"
                              disabled={true}
                            ></input>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style={{ color: 'red', padding: '8px' }}>
                      {pwalert ? null : '비밀번호가 일치하지 않습니다'}
                    </p>
                    <Button onClick={() => patchPassword} disabled={true}>
                      비밀번호 변경
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </S.UserTable>
    </S.Section>
  );
};

export default UserInfo;
