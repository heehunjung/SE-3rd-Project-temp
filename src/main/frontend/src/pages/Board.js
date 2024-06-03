import React, { useEffect, useState } from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, Tab, Tabs, Row, Col, Card, Badge } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import './Board.css'; // 추가된 스타일 시트

const Board = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [boardData, setBoardData] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/memberInfo/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
            })
            .catch(error => setError(error.message));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/board`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setBoardData(data))
            .catch(error => setError(error.message));
    }, [id]);

    const filterPosts = (boardType) => {
        return boardData.filter(post => post.board === boardType);
    };

    const sortPostsByDate = (posts) => {
        // 공지사항을 우선적으로 정렬
        const noticePosts = posts.filter(post => post.board === 1);
        const otherPosts = posts.filter(post => post.board !== 1);

        const sortedNoticePosts = noticePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const sortedOtherPosts = otherPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return [...sortedNoticePosts, ...sortedOtherPosts];
    };

    const topPosts = boardData
        .sort((a,b) => b.view - a.view)
        .slice(0,5);

    const getBadgeColor = (boardType) => {
        switch (boardType) {
            case 1: // 공지사항
                return "warning";
            case 2: // 종목 토론 방
                return "success";
            case 3: // 자유 게시판
                return "info";
            default: // 기타
                return "primary";
        }
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    {userData && userData.role === 'ADMIN' ? (
                        <Navbar.Brand href={`/Home/${id}`}>KW 거래소📉 관리자 모드</Navbar.Brand>
                    ) : (
                        <Navbar.Brand href={`/Home/${id}`}>KW 거래소📉</Navbar.Brand>
                    )}
                    <Nav className="ml-auto">
                        <Nav.Link href={`/Home/${id}`}>홈 화면</Nav.Link>
                        <Nav.Link href={`/Trading/${id}`}>주식 구매</Nav.Link>
                        <Nav.Link href={`/Board/${id}`}>커뮤니티</Nav.Link>
                        <Nav.Link href={`/MyInfo/${id}`}>내 정보</Nav.Link>
                        <Nav.Link href={`/Post/${id}`}>게시글 작성</Nav.Link>
                        <Nav.Link href={'/Login'}>로그아웃</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Tabs defaultActiveKey="all" transition={false} id="noanim-tab-example" className="mb-3">
                                    <Tab eventKey="all" title="전체 게시판">
                                        <Card.Body className="scrollable-card">
                                            {sortPostsByDate(boardData).map(post => (
                                                <p key={post.id}>
                                                    <Badge bg={getBadgeColor(post.board)}>작성자: {post.nickname} </Badge>
                                                    <Badge bg="secondary">조회수: {post.view}</Badge>
                                                    <span
                                                        style={{fontSize: '0.8em', color: 'gray', marginLeft: '10px'}}>
                                                        {new Date(post.createdAt).toLocaleString()}
                                                    </span>
                                                    <br/>
                                                    <Link
                                                        className="custom-link"
                                                        to={`/ViewPost/${post.id}?memberId=${id}`}
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </p>
                                            ))}
                                        </Card.Body>
                                    </Tab>
                                    <Tab eventKey="info" title="공지사항">
                                        <Card.Body className="scrollable-card">
                                            {sortPostsByDate(filterPosts(1)).map(post => (
                                                <p key={post.id}>
                                                    <Badge bg="warning">작성자: {post.nickname} </Badge>
                                                    <Badge bg="secondary">조회수: {post.view}</Badge>
                                                    <span
                                                        style={{fontSize: '0.8em', color: 'gray', marginLeft: '10px'}}>
                                                        {new Date(post.createdAt).toLocaleString()}
                                                    </span>
                                                    <br/>
                                                    <Link
                                                        className="custom-link"
                                                        to={`/ViewPost/${post.id}?memberId=${id}`}
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </p>
                                            ))}
                                        </Card.Body>
                                    </Tab>
                                    <Tab eventKey="discussion" title="종목 토론 방">
                                        <Card.Body className="scrollable-card">
                                            {sortPostsByDate(filterPosts(2)).map(post => (
                                                <p key={post.id}>
                                                    <Badge bg="success">작성자: {post.nickname} </Badge>
                                                    <Badge bg="secondary">조회수: {post.view}</Badge>
                                                    <span
                                                        style={{fontSize: '0.8em', color: 'gray', marginLeft: '10px'}}>
                                                        {new Date(post.createdAt).toLocaleString()}
                                                    </span>
                                                    <br/>
                                                    <Link
                                                        className="custom-link"
                                                        to={`/ViewPost/${post.id}?memberId={id}`}
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </p>
                                            ))}
                                        </Card.Body>
                                    </Tab>
                                    <Tab eventKey="free" title="자유 게시판">
                                        <Card.Body className="scrollable-card">
                                            {sortPostsByDate(filterPosts(3)).map(post => (
                                                <p key={post.id}>
                                                    <Badge bg="info">작성자: {post.nickname} </Badge>
                                                    <Badge bg="secondary">조회수: {post.view}</Badge>
                                                    <span
                                                        style={{fontSize: '0.8em', color: 'gray', marginLeft: '10px'}}>
                                                        {new Date(post.createdAt).toLocaleString()}
                                                    </span>
                                                    <br/>
                                                    <Link
                                                        className="custom-link"
                                                        to={`/ViewPost/{post.id}?memberId={id}`}
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </p>
                                            ))}
                                        </Card.Body>
                                    </Tab>
                                </Tabs>
                            </Card.Header>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Header>🔥인기게시물🔥</Card.Header>
                            <Card.Body className="scrollable-card2">
                                {topPosts.map(post => (
                                    <p key={post.id}>
                                        <Badge bg={getBadgeColor(post.board)}>작성자: {post.nickname} </Badge>
                                        <Badge bg="secondary">조회수: {post.view}</Badge>
                                        <span
                                            style={{fontSize: '0.8em', color: 'gray', marginLeft: '10px'}}>
                                            {new Date(post.createdAt).toLocaleString()}
                                        </span>
                                        <br/>
                                        <Link
                                            className="custom-link"
                                            to={`/ViewPost/${post.id}?memberId=${id}`}
                                        >
                                            {post.title}
                                        </Link>
                                    </p>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>🔀랜덤 주식 추천🔀</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>게시글이 없습니다.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Board;
