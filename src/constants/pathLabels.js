// constants/pathLabels.js
import Cookies from 'js-cookie';
import { MdHome } from 'react-icons/md';

const PATH_LABELS = {
  '': {
    label: '',
    icon: MdHome,
  },
  'admin-settings': '관리자 설정',
  organization: '기관',
  'organization/new': '기관 등록',
  'organization/:id': '기관 상세',
  'organization/:id/edit': '기관 수정',
  patients: '환자관리',
  'patients/new': '신규 등록',
  'patients/records': '재원 환자',

  account: '계정설정',
  ward: '병동설정',
  alarm: '알람설정',
  device: '장치관리',
  theme: '테마설정',
};

export default PATH_LABELS;

export function resolveLabel(pathname) {
  const orgLabel = Cookies.get('orgLabel') || '기관'; // 쿠키 없으면 기본 '기관'

  for (const pattern in PATH_LABELS) {
    const label = PATH_LABELS[pattern];
    const regex = new RegExp('^' + pattern.replace(':id', '[^/]+') + '$');

    if (regex.test(pathname)) {
      return label.replace('기관', orgLabel);
    }
  }

  return null;
}
