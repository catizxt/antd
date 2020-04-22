import React, { Component } from 'react';
//import ReactPlayer from 'react-player'
import { Player } from 'video-react';
import "video-react/dist/video-react.css";

export default props => {
    const params = {
        href:props.location
    };
    if(params.href){
        return (
            <Player>
                <source src={"http://39.96.93.7:8000/hdfs/play?fpath=/user/data/video/"+params.href.query.href} />
            </Player>
        );
    }
    else {
        return (
            <Player>
                <source src={"http://39.96.93.7:8000/hdfs/play?fpath=/user/data/test.mp4" } />
            </Player>
        );
    }
};
// <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
//<source src="http://39.96.93.7:8000/hdfs/play?fpath=/user/data/test.mp4" />
//
//1、这里的url获取需要调用一下service的url
//方法：设置一个静态页，资源的页面，从数据库中读取出来，类似网上的那种视频播放页
//然后再跳到播放视频的页面

//还有一个重要的是
//前端是可以带参数的，到时候资源页面指向的链接得是前端的链接
//?url=网址所在的地方，这样就能播放视频了

// export default class App extends Component {
//     render () {
//         <Player>
//             <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
//         </Player>
//          }
// }


