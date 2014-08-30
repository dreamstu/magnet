{{if data && data.length>0}}
	{{each data as image i}}
		<div class="{{prefixCls}}-items">
			<div class="{{prefixCls}}-img">
				<img src="
						{{if image.imgurl=="" || image.imgurl=="暂无"}}
							{{defaulturl}}
						{{else}}
							{{image.imgurl}}
						{{/if}}"
					width="{{width}}" height="{{height}}"/>
				<div class="{{prefixCls}}-desc">{{image.desc}}</div>
			</div>
			<div class="{{prefixCls}}-title">{{image.title}}</div>
		</div>
	{{/each}}
{{/if}}