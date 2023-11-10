const pool = require("../config/db");

// CCTV 카메라 객체
const Camera = function (camera) {
  this.camera_id = camera.id;
  this.address = camera.address;
  this.position = camera.position;
  this.created_at = camera.created_at;
  this.updated_at = camera.updated_at;
}

// 신고 객체
const Report = function (report) {
  this.report_id = report.id;
  this.reported_at = report.reported_at;
  this.position = report.position;
  this.address = report.address;
  this.created_at = report.created_at;
  this.updated_at = report.updated_at;
}

// 직사각형의 1번, 4번 점을 받아 1, 2, 3, 4번 점을 반환하는 함수
async function computeAllBoxPoints (box_point_1, box_point_4) {
  // box_point: [127.1,37.1]
  const box_point_2 = [box_point_4[0], box_point_1[1]];
  const box_point_3 = [box_point_1[0], box_point_4[1]];
  const box_points = [box_point_1, box_point_2, box_point_3, box_point_4]
  return box_points;
}

// 영역 꼭짓점 1번, 4번을 받아 해당 범위 내에 있는 카메라 point 반환하는 메서드
Camera.getCameras = async (box_point_1, box_point_4) => {
  const box_points = await computeAllBoxPoints(box_point_1, box_point_4);
  const result = await pool.query(
    `SELECT * FROM cameras
    WHERE ST_Contains(
        ST_GeomFromText(
            CONCAT(
                'POLYGON((',
                ?, ' ', ?, ', ',
                ?, ' ', ?, ', ',
                ?, ' ', ?, ', ',
                ?, ' ', ?, ', ',
                ?, ' ', ?, '))'
            )
        ),
        position
    )`,
    [box_points[0][0], box_points[0][1], box_points[1][0], box_points[1][1],
    box_points[2][0], box_points[2][1], box_points[3][0], box_points[3][1],
    box_points[0][0], box_points[0][1]]
  );
  return result[0];
}


// 영역 꼭짓점 1번, 4번을 받아 해당 범위 내에 있는 신고 point 반환하는 메서드
Report.getReports = async (box_point_1, box_point_4) => {
  const box_points = await computeAllBoxPoints(box_point_1, box_point_4);
  const result = await pool.query(
    `SELECT * FROM cameras
    WHERE ST_Contains(
        ST_GeomFromText(
            CONCAT(
                'POLYGON((',
                ?, ' ', ?, ', ',
                ?, ' ', ?, ', ',
                ?, ' ', ?, ', ',
                ?, ' ', ?, ', ',
                ?, ' ', ?, '))'
            )
        ),
        position
    )`,
    [box_points[0][0], box_points[0][1], box_points[1][0], box_points[1][1],
    box_points[2][0], box_points[2][1], box_points[3][0], box_points[3][1],
    box_points[0][0], box_points[0][1]]
  );
  return result[0];
}

module.exports = { Camera, Report };
