const { Camera, Report } = require("../models/Model");

async function parseQuery(rectangle_string) {
  const coordinates = (rectangle_string||"").split(',').map(Number);
  const range_points = [];
  for (let i = 0; i < coordinates.length; i += 2) {
    range_points.push([coordinates[i], coordinates[i+1]]);
  }
  return range_points;
}

// 범위 내 CCTV camera 목록 조회하기
exports.cameraGetMid = async (req, res) => {
  try {
    //입력 쿼리 파싱
    const range_points = await parseQuery(req.query.rectangle);
    // 함수 호출
    const cameras = await Camera.getCameras(range_points[0], range_points[1]);
    res.status(200).send({ data: cameras, success: true });
  } catch (e) {
    console.error(e);
    res.status(500).send({ success: false, message: "오류가 발생하였습니다." });
  }
}

// 범위 내 신고 목록 조회하기
exports.reportGetMid = async (req, res) => {
  try {
    // 입력 쿼리 파싱
    const range_points = await parseQuery(req.query.rectangle);
    // 함수 호출
    const reports = await Report.getReports(range_points[0], range_points[1])
    res.status(200).send({ data: reports, success: true });
    
  } catch (e) {
    console.error(e);
    res.status(500).send({ success: false })
  }
}