// 아사나 태스크 생성 서버리스 함수
// 환경변수: ASANA_ACCESS_TOKEN, ASANA_PROJECT_ID

const ASANA_API_URL = 'https://app.asana.com/api/1.0/tasks';

// 상품 옵션 GID 매핑
const SERVICE_OPTION_MAP = {
  'plus': '1212314086557572',
  'season': '1212314086557574',
  'members': '1212314086557573',
  'partners': '1212314086557575',
  'consultation': '1212314086557576'
};

// 서비스 한글명 매핑
const SERVICE_NAME_MAP = {
  'plus': '플러스 플랜',
  'season': '시즌패스 플랜',
  'members': '멤버스 플랜',
  'partners': '파트너스 플랜',
  'consultation': '일반 상담 문의'
};

exports.handler = async (event) => {
  // CORS 헤더
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // POST만 허용
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, phone, company, service, message } = JSON.parse(event.body);

    // 필수 필드 검증
    if (!name || !email || !service) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // 태스크 본문 생성
    const taskNotes = `═══════════════════════════════
       📋 문의 정보 요약
═══════════════════════════════

▶ 회사명: ${company || '미입력'}
▶ 담당자: ${name}
▶ 이메일: ${email}
▶ 연락처: ${phone || '미입력'}
▶ 서비스: ${SERVICE_NAME_MAP[service] || service}

───────────────────────────────
       💬 상세 문의사항
───────────────────────────────

${message || '상세 문의사항 없음'}

───────────────────────────────
📅 접수일시: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
🌐 출처: 아마존캐리 웹사이트`;

    // 아사나 API 요청 데이터
    const asanaData = {
      data: {
        name: company || `${name} 문의`,
        notes: taskNotes,
        projects: [process.env.ASANA_PROJECT_ID],
        custom_fields: {
          '1210338770021932': SERVICE_OPTION_MAP[service] || null
        }
      }
    };

    // 아사나 API 호출
    const response = await fetch(ASANA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ASANA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(asanaData)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Asana API Error:', result);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Failed to create Asana task', details: result })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, taskGid: result.data.gid })
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};
